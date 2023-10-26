export function updatePageTitle(title: string) {
  const defaultTitle = process.env.REACT_APP_WEBSITE_NAME || '';
  document.title = title ? `${title} - ${defaultTitle}` : defaultTitle;
}
