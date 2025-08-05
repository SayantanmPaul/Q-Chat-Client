import { Components } from 'react-markdown';

export const MarkdownRenderer: Components = {
  h1: h1 => <h1 className="text-xl font-bold lg:text-2xl" {...h1} />,
  h2: h2 => <h2 className="text-lg font-semibold lg:text-xl" {...h2} />,
  p: p => <p className="text-base lg:text-lg" {...p} />,
  code: code => (
    <code className="rounded bg-gray-200 p-1 dark:bg-gray-800" {...code} />
  ),
  li: li => <li className="text-base lg:text-lg" {...li} />,
  pre: pre => (
    <pre
      className="my-2 overflow-x-auto rounded bg-gray-100 p-3 dark:bg-gray-900"
      {...pre}
    />
  ),
  a: ({ href, children, ...rest }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline dark:text-blue-400"
      {...rest}
    >
      {children}
    </a>
  ),
  strong: ({ ...props }) => <strong className="font-bold" {...props} />,
  em(props) {
    const { ...rest } = props;
    return (
      <i
        className="text-blue-600 hover:underline dark:text-blue-400"
        {...rest}
      />
    );
  },
  blockquote: ({ children, ...rest }) => (
    <blockquote
      className="border-l-4 border-blue-400 pl-4 text-gray-600 italic dark:text-gray-300"
      {...rest}
    >
      {children}
    </blockquote>
  ),
  ul: ({ children, ...rest }) => (
    <ul className="list-disc pl-6" {...rest}>
      {children}
    </ul>
  ),
  ol: ({ children, ...rest }) => (
    <ol className="list-decimal pl-6" {...rest}>
      {children}
    </ol>
  ),
  hr: props => (
    <hr className="my-4 border-gray-300 dark:border-gray-700" {...props} />
  ),
};
