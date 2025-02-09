export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const response = await fetch('https://api.osv.dev/v1/querybatch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body.payload),
    });

    if (!response.ok) {
      return Response.json({
        status: 400,
        statusText: 'Failed to fetch data from OSV API',
      });
    }

    return Response.json(await response.json());
  } catch (error) {
    // send the error to a log service like Sentry
    console.error(error);

    return Response.json({
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
};
