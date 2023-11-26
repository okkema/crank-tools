import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkEmoji from "remark-emoji"
import README from "@virtual:plain-text/README.md"
import { Link } from "@mui/material"

export function About(): JSX.Element {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkEmoji]}
      components={{
        // @ts-expect-error type mismatch
        a: (props) => <Link {...props} />,
        // Remove default style from checkboxes
        ul: (props) => (
          <ul {...props} style={{ listStyle: "none", paddingLeft: 0 }} />
        ),
      }}
    >
      {README}
    </ReactMarkdown>
  )
}

// Needed for lazy loading in routes.tsx
export default About
