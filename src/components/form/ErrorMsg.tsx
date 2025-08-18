import React from 'react';

function ErrorMsg({ error }: { error: string }) {
  return <p className="text-sm text-red-500">{error}</p>;
}

export default ErrorMsg;
