import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { plainText as README } from "@virtual:plain-text/README.md"
import { Container, Link } from "@mui/material"

const About = (): JSX.Element => (
  <Container>
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: (props) => <Link {...props} />,
      }}
    >
      {README}
    </ReactMarkdown>
  </Container>
)

export default About
