import { cn } from '@/lib/utils';
import { Components } from 'react-markdown';

export const MarkdownRenderer: Components = {
  h1: h1 => <h1 className="my-2 text-2xl font-semibold lg:text-3xl" {...h1} />,
  h2: h2 => <h2 className="my-1 text-xl font-semibold lg:text-2xl" {...h2} />,
  h3: h2 => <h2 className="my-1 text-lg font-semibold lg:text-xl" {...h2} />,
  h4: h2 => <h2 className="my-1 text-base font-semibold lg:text-lg" {...h2} />,
  p: p => (
    <p className="text-sm font-medium text-[#FAFAF9] lg:text-base" {...p} />
  ),
  code: code => <code className="font-serif text-sm" {...code} />,
  li: li => <li className="text-sm font-medium lg:text-base" {...li} />,
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
      <i className="text-base font-medium text-[#FAFAF9] italic" {...rest} />
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
  table: ({ children, ...rest }) => (
    <table className="w-full table-auto border-collapse" {...rest}>
      {children}
    </table>
  ),
  thead: ({ children, ...rest }) => (
    <thead className="border-b border-[#404040]/10 bg-[#404040]/40" {...rest}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...rest }) => (
    <tbody className="divide-y divide-[#404040]/80" {...rest}>
      {children}
    </tbody>
  ),
  th: ({ children, ...rest }) => (
    <th
      className="font-briColage bg-accent/60 p-3 text-start text-base font-bold tracking-wide text-[#FAFAF9]"
      {...rest}
    >
      {children}
    </th>
  ),
  tr: ({ children, ...rest }) => (
    <tr
      className={cn(
        'p-4',
        'p-3 odd:bg-[#404040]/20',
        'p-3 even:bg-[#404040]/40',
      )}
      {...rest}
    >
      {children}
    </tr>
  ),
  td: ({ children, ...rest }) => (
    <td
      className="font-briColage p-3 text-sm font-medium text-[#FAFAF9]"
      {...rest}
    >
      {children}
    </td>
  ),
  hr: props => <hr className="my-4 border-gray-700" {...props} />,
};
