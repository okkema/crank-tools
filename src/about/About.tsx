import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import README from "@virtual:plain-text/README.md"
import { Link } from "@mui/material"

export function About(): JSX.Element {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // @ts-expect-error type mismatch
        a: (props) => <Link {...props} />,
      }}
    >
      {README}
    </ReactMarkdown>
  )
}

export default About
