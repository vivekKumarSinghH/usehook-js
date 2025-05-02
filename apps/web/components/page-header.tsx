interface PageHeaderProps {
  heading: string
  text?: string
}

export function PageHeader({ heading, text }: PageHeaderProps) {
  return (
    <div className="space-y-4 pb-10">
      <h1 className="inline-block text-4xl font-bold tracking-tight">{heading}</h1>
      {text && <p className="text-xl text-muted-foreground">{text}</p>}
    </div>
  )
}
