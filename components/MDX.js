import NextLink from 'next/link'

const CustomLink = (props) => {
  const href = props.href
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

  if (isInternalLink) {
    return (
      <NextLink href={href}>
        <a {...props} className="underline" />
      </NextLink>
    )
  }

  return <a {...props} className="underline" />
}

const Hr = () => {
  return <hr className="border-gray-200 my-4 w-full" />
}

const MDXComponents = {
  h1: (props) => <h1 className="text-4xl font-bold my-4" {...props} />,
  h2: (props) => <h2 className="text-xl font-bold mt-8 mb-4" {...props} />,
  h3: (props) => <h3 className="text-md font-bold" {...props} />,
  inlineCode: (props) => <pre className="text-sm" {...props} />,
  pre: (props) => <pre className="block whitespace-pre-wrap rounded-md my-4 p-4" {...props} />,
  br: (props) => <div className="h-40" {...props} />,
  hr: Hr,
  a: CustomLink,
  p: (props) => <p className="mt-4" {...props} />,
  ul: (props) => <ul className="pt-2 pl-4 ml-2" {...props} />,
  ol: (props) => <ol className="pt-2 pl-4 ml-2" {...props} />,
  li: (props) => <li className="pb-1" {...props} />,
}

export { CustomLink }
export default MDXComponents
