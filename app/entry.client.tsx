import { RemixBrowser } from "@remix-run/react";
import { hydrate } from "react-dom";

hydrate(<RemixBrowser />, document);
// hydrateRoot(document, <RemixBrowser />);
// https://github.com/remix-run/remix/issues/2570#issuecomment-1099696456
