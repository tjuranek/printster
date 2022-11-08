import { Link } from "@remix-run/react";

interface Breadcrumb {
  icon: JSX.Element;
  name: string;
  link: string;
}

interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
}

export function Breadcrumbs(props: BreadcrumbsProps) {
  const { breadcrumbs } = props;

  return (
    <div className="text-sm breadcrumbs mb-4">
      <ul data-test-id="breadcrumbs">
        {breadcrumbs.map(({ icon, name, link }) => (
          <li key={name}>
            <Link to={link} data-test-id={`breadcrumbs-link-${name}`}>
              <span className="pr-1">{icon}</span>

              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
