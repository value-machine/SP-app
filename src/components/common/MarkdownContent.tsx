import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import ReactMarkdown from "react-markdown";

export interface MarkdownContentProps {
  markdown: string;
}

/**
 * Renders markdown with MUI-friendly defaults (links open in new tab).
 */
export const MarkdownContent = ({ markdown }: MarkdownContentProps) => {
  return (
    <Box
      component="div"
      sx={{
        "& p": {
          margin: 0,
          marginBottom: (theme) => theme.spacing(1),
        },
        "& p:last-child": { marginBottom: 0 },
        "& ul": {
          margin: 0,
          marginBottom: (theme) => theme.spacing(1),
          paddingLeft: (theme) => theme.spacing(2.5),
        },
        "& li": { marginBottom: (theme) => theme.spacing(0.5) },
        "& strong": { fontWeight: (theme) => theme.typography.fontWeightBold },
      }}
    >
      <ReactMarkdown
        components={{
          a: ({ href, children }) => (
            <Link href={href ?? "#"} target="_blank" rel="noopener noreferrer" variant="body2">
              {children}
            </Link>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </Box>
  );
};
