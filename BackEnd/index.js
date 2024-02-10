const WebSocket = require('ws')
const { v4: uuidv4 } = require('uuid')
const http = require('http')

const server = http.createServer()
const wss = new WebSocket.Server({ server })

const players = {}
let count = 0
wss.on('connection', (ws, req) => {
	const _clientId = uuidv4()
	ws.clientId = _clientId
	players[ws.clientId] = generatePlayer(ws.clientId, {
		color: `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`,
		position: [Math.floor(Math.random() * 10) - 4,1.5,Math.floor(Math.random() * 10) -4]
	})
  console.log('connected')
  wss.clients.forEach(client => {
    client.send( JSON.stringify({
      players: players,
      currentPlayerId: ws.clientId
    }))
  })
	ws.on('message', message => {
    let data = JSON.parse(message)
    if(data.type == 'playerUpdate') {
      players[data.currentPlayerId] = data.players[data.currentPlayerId]
      count++
      console.log(count)
    }
    wss.clients.forEach(client => {
      client.send( JSON.stringify({
        players: players,
        currentPlayerId: client.clientId
      }))
    })
	})
	ws.on('close', () => {
		delete players[ws.clientId]
    console.log(`player ${ws.clientId} disconnected:`)
    wss.clients.forEach(client => {
      client.send(JSON.stringify(players))
    })
	})
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {})

const generatePlayer = (id, { color, position }) => {
	let player = {
		playerId: id,
		color,
		position
	}
	return player
}
