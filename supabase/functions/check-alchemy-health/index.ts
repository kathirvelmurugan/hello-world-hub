import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const ALCHEMY_KEY = Deno.env.get('ALCHEMY_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

serve(async (req) => {
    const startTime = Date.now()
    let status = 'ACTIVE'
    let responseTime = 0
    let errorType = null
    let errorMessage = null

    try {
        if (!ALCHEMY_KEY) throw new Error('ALCHEMY_API_KEY is not set')

        const response = await fetch(`https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                method: 'eth_blockNumber',
                params: [],
                id: 1
            })
        })

        responseTime = Date.now() - startTime
        const data = await response.json()

        if (!response.ok) {
            if (response.status === 429) {
                status = 'RATE_LIMIT'
                errorType = 'Too Many Requests'
            } else if (response.status === 401 || response.status === 403) {
                status = 'INVALID_KEY'
                errorType = 'Authentication Failed'
            } else {
                status = 'DOWN'
                errorType = 'HTTP Error'
            }
            errorMessage = data.error?.message || response.statusText
        } else if (data.error) {
            errorMessage = data.error.message.toLowerCase()

            if (errorMessage.includes('invalid api key')) {
                status = 'INVALID_KEY'
            } else if (errorMessage.includes('capacity reached') || errorMessage.includes('quota') || errorMessage.includes('billing')) {
                status = 'PAYMENT_ISSUE'
            } else if (errorMessage.includes('rate limit')) {
                status = 'RATE_LIMIT'
            } else {
                status = 'DOWN'
            }
            errorType = 'RPC Error'
        } else if (responseTime > 2000) {
            status = 'DEGRADED'
            errorType = 'Slow Response'
        }

    } catch (err) {
        status = 'DOWN'
        responseTime = Date.now() - startTime
        errorMessage = (err as Error).message
        errorType = 'Network Failure'
    }

    // Store in DB
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!)

    const { error: dbError } = await supabase
        .from('alchemy_monitor_logs')
        .insert([{
            status,
            response_time_ms: responseTime,
            error_type: errorType,
            error_message: errorMessage,
            timestamp: new Date().toISOString()
        }])

    if (dbError) {
        console.error('Database insertion failed:', dbError)
        return new Response(JSON.stringify({ error: dbError.message }), { status: 500 })
    }

    return new Response(
        JSON.stringify({ status, responseTime, errorType, errorMessage }),
        { headers: { "Content-Type": "application/json" } }
    )
})
