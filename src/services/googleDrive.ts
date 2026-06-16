export const FILE_NAME = 'coreswing_log.json';

/**
 * Ensures the JSON file exists in the user's Google Drive.
 * If not, it creates an empty array structure.
 */
export const initializeDriveFile = async (accessToken: string, fileName: string) => {
  // Try to find the file
  const searchRes = await fetch(`https://www.googleapis.com/drive/v3/files?q=name='${fileName}' and trashed=false`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  
  const searchData = await searchRes.json();
  
  if (searchData.files && searchData.files.length > 0) {
    return searchData.files[0].id; // File exists, return ID
  }

  // Create the file if it doesn't exist
  const metadata = {
    name: fileName,
    mimeType: 'application/json'
  };

  const form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  form.append('file', new Blob([JSON.stringify([])], { type: 'application/json' }));

  const createRes = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: form
  });

  const createData = await createRes.json();
  return createData.id;
};

/**
 * Reads all log data from the file.
 */
export const readLogs = async (accessToken: string, fileId: string) => {
  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  
  if (!res.ok) {
    throw new Error('Failed to read logs');
  }

  return await res.json();
};

/**
 * Writes data to the file, overwriting existing content.
 */
export const writeLogs = async (accessToken: string, fileId: string, data: any) => {
  const res = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error('Failed to write logs');
  }
  
  return await res.json();
};
