import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  if (!text) throw 'Please provide a Pokemon name to search for.'

  const url = `https://some-random-api.com/pokemon/pokedex?pokemon=${encodeURIComponent(text)}`

  const response = await fetch(url)
  const json = await response.json()

  if (!response.ok) {
    throw `An error occurred: ${json.error}`
  }

  const message = `
*≡ Name:* ${json.name}
*≡ ID:* ${json.id}
*≡ Type:* ${json.type}
*≡ Abilities:* ${json.abilities.join(', ')}
*≡ Height:* ${json.height}
*≡ Weight:* ${json.weight}
*≡ Description:* ${json.description}
`

  // Correctly send the message using the appropriate structure
  conn.sendMessage(m.chat, { text: message }, { quoted: m })
}

handler.help = ['pokedex <pokemon>']
handler.tags = ['anime']
handler.command = /^pokedex/i

export default handler
