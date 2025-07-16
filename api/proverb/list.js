import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  const { method } = req

  try {
    switch (method) {
      case 'GET':
        const { data, error } = await supabase
          .from('proverbs')
          .select('*')

        if (error) throw error
        return res.status(200).json(data)

      default:
        res.setHeader('Allow', ['GET'])
        return res.status(405).json({ message: `Method ${method} Not Allowed` })
    }
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ error: error.message })
  }
}