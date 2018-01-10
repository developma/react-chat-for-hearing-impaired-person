const express = require('express')
const app = express()
const server = require('http').createServer(app)
const port = 3000
const socketio = require('socket.io')

server.listen(port, () => {
  console.log('[INFO] server running... on ' + port)
})

// Return files which is in public directory.
app.use('/public', express.static('./public'))
// Transfer access '/' to '/public'.
app.get('/', (req, res) => {
  res.redirect(302, '/public')
})

// Prepare to run websocket server.
const io = socketio.listen(server)

const userList = []

// An event for client.
io.on('connection', (socket) => {
  console.log('[INFO] an user participated in websocket server.', socket.client.id)
  socket.on('message', (msg) => {
    console.log('message', msg)
    // Send a message to all client.
    let colorCode = ''
    userList.some((v, i) => {
      if (v.id === msg.id) colorCode = userList[i].colorCode
    })
    msg.colorCode = colorCode
    io.emit('message', msg)
    userList.some((v, i) => {
      if (v.id === msg.id) userList[i].tmpmessage = ''
    })
    io.emit('users', ({
      users: userList
    }))
  })
  socket.on('tmpmessage', (msg) => {
    userList.some((v, i) => {
      if (v.id === msg.id) userList[i].tmpmessage = msg.body
    })
    io.emit('users', ({
      users: userList
    }))
  })

  socket.on('join', (user) => {
    const name = user.name
    let colorCode = '#'
    for (let i = 0; i < 6; i++) {
      colorCode += '0123456789abcdef'[16 * Math.random() | 0]
    }
    userList.unshift(
      {
        id: user.id,
        name: name,
        tmpmessage: '',
        colorCode: colorCode
      }
    )
    io.emit('users', ({
      users: userList
    }))
    io.emit('message', ({
      id: 'admin',
      name: 'administrator',
      body: name + ' has joined to this chat.'
    }))
  })

  socket.on('leave', (user) => {
    const name = user.name
    userList.some((v, i) => {
      if (v.id === user.id) userList.splice(i, 1)
    })
    io.emit('message', ({
      id: 'admin',
      name: 'administrator',
      body: name + ' has left from this chat.'
    }))
  })

  socket.on('disconnect', () => {
    console.log('[INFO] disconnected! ' + socket.id)
    userList.some((v, i) => {
      if (v.id === socket.id) userList.splice(i, 1)
    })
    io.emit('users', ({
      users: userList
    }))
  })
})
