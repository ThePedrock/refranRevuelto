import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  const { method } = req
  const { id } = req.query // Ahora obtenemos el id directamente de req.query

  if (!id) {
    return res.status(400).json({ error: 'Se requiere un ID' })
  }

  try {
    switch (method) {
      case 'GET':
        const { data, error } = await supabase
          .from('proverbs')
          .select('*')
          .eq('id', id)
          .single()

        if (error) throw error

        if (!data) {
          return res.status(404).json({ error: 'Proverbio no encontrado' })
        }

        return res.status(200).json(data)

      default:
        res.setHeader('Allow', ['GET'])
        return res.status(405).json({ message: `Método ${method} no permitido` })
    }
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ error: error.message })
  }
}