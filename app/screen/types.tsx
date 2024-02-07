export type ThoughtProps = {
  text: string
  reasoning: string
  plan: string
  criticism: string
  speak: string
}

export type CommandProps = {
  name: string
  args: Record<string, any>
}

export type ThoughtContentProps = {
  thoughts: ThoughtProps
  command: CommandProps
  fromName: string
}

export type GenericContentProps = {
  fromName: string
  content: string
}
