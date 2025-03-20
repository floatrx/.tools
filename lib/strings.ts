/**
 * Make first letter uppercase
 * @param str
 */
export const upperFirst = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Parse Jira issue from URL
 * @param url
 * @returns number | null
 */
export const parseJiraIssue = (url: string): string | undefined => url.match(/\/browse\/([A-Z]+-\d+)/)?.[1];
