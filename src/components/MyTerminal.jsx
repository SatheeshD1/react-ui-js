import React, { Component } from 'react'
import Terminal from 'react-console-emulator'

const commands = {
  echo: {
    description: 'Echo a passed string.',
    usage: 'echo <string>',
    fn: (...args) => args.join(' ')
  }
}

export default class MyTerminal extends Component {
  render () {
    return (
      <Terminal className='h-full'
        commands={commands}
        welcomeMessage={''}
        promptLabel={'C:\Satheesh>'}
      />
    )
  }
}