import { z } from 'zod';

const packageJsonSchema = z.object({
  name: z.string(),
  version: z.string(),
  dependencies: z.record(z.string()),
});

export const validatePackageJson = (
  jsonData: Record<string, unknown>
): boolean => {
  const result = packageJsonSchema.safeParse(jsonData);
  return result.success;
};

const buildPayload = (parsedFile: Record<string, unknown>) => {
  const dependencies = parsedFile.dependencies as
    | Record<string, string>
    | undefined;

  if (!dependencies) {
    return { queries: [] };
  }

  const queries = Object.entries(dependencies).map(([name, version]) => ({
    version,
    package: {
      name,
      ecosystem: 'npm',
    },
  }));

  return { queries };
};

const getVulnerabilities = async (parsedFile: Record<string, unknown>) => {
  const payload = buildPayload(parsedFile);
  const response = await fetch('/api/scan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ payload }),
  });

  return response;
};

export const scanDependencies = async (
  parsedFile: Record<string, string | Record<string, string>>
) => {
  const response = await getVulnerabilities(parsedFile);
  const data = await response.json();

  const vulnerabilities = Object.entries(parsedFile.dependencies)
    .map(([pkgName, version], index) =>
      data.results[index]?.vulns
        ? {
            pkg: pkgName,
            version,
            vulnerabilities: data.results[index].vulns,
          }
        : null
    )
    .filter(Boolean);

  return vulnerabilities.length > 0
    ? `data=${encodeURIComponent(JSON.stringify(vulnerabilities))}`
    : '';
};
