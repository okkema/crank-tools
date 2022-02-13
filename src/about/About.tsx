import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { plainText as README } from "@virtual:plain-text/README.md"
import { Link } from "@mui/material"

const About = (): JSX.Element => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      a: (props) => <Link {...props} />,
    }}
  >
    {README}
  </ReactMarkdown>
)

export default About
