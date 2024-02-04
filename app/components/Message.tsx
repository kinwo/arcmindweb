import React from 'react'

type MessageProps = {
  message: string
}

export const Message = ({ message }: MessageProps) => (
  <section>
    <p>{message}</p>
  </section>
)
