// Proxy all API requests to backend
export async function GET(request, { params }) {
  const { path } = params;
  const apiUrl = `${process.env.API_BASE_URL}/${path.join('/')}`;
  
  const response = await fetch(apiUrl, {
    headers: {
      'Content-Type': 'application/json',
      // Forward authorization header
      Authorization: request.headers.get('Authorization') || '',
    },
  });
  
  const data = await response.json();
  return Response.json(data, { status: response.status });
}

export async function POST(request, { params }) {
  const { path } = params;
  const body = await request.json();
  
  const apiUrl = `${process.env.API_BASE_URL}/${path.join('/')}`;
  
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: request.headers.get('Authorization') || '',
    },
    body: JSON.stringify(body),
  });
  
  const data = await response.json();
  return Response.json(data, { status: response.status });
}

export async function PATCH(request, { params }) {
  const { path } = params;
  const body = await request.json();
  
  const apiUrl = `${process.env.API_BASE_URL}/${path.join('/')}`;
  
  const response = await fetch(apiUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: request.headers.get('Authorization') || '',
    },
    body: JSON.stringify(body),
  });
  
  const data = await response.json();
  return Response.json(data, { status: response.status });
}

export async function DELETE(request, { params }) {
  const { path } = params;
  
  const apiUrl = `${process.env.API_BASE_URL}/${path.join('/')}`;
  
  const response = await fetch(apiUrl, {
    method: 'DELETE',
    headers: {
      Authorization: request.headers.get('Authorization') || '',
    },
  });
  
  const data = await response.json();
  return Response.json(data, { status: response.status });
}