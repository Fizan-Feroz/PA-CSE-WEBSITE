// Resolves Google Drive file links, folder links, Google Docs/Slides/Sheets, and direct PDF URLs
// into in-site iframe preview URLs and direct download URLs.

export function resolveDriveUrls(url) {
  if (!url || typeof url !== 'string') {
    return { previewUrl: '', downloadUrl: '', kind: 'none' };
  }

  const trimmed = url.trim();

  // 1. Google Drive Folder: https://drive.google.com/drive/folders/<FOLDER_ID>
  const folderMatch = trimmed.match(/drive\.google\.com\/drive\/(?:u\/\d+\/)?folders\/([a-zA-Z0-9_-]+)/);
  if (folderMatch && folderMatch[1]) {
    const folderId = folderMatch[1];
    return {
      previewUrl: `https://drive.google.com/embeddedfolderview?id=${folderId}#list`,
      downloadUrl: `https://drive.google.com/drive/folders/${folderId}`,
      kind: 'drive-folder'
    };
  }

  // 2. Google Drive File: /file/d/<FILE_ID>/view or open?id=<FILE_ID>
  const fileMatch =
    trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
  if (fileMatch && fileMatch[1]) {
    const fileId = fileMatch[1];
    return {
      previewUrl: `https://drive.google.com/file/d/${fileId}/preview`,
      downloadUrl: `https://drive.google.com/uc?export=download&id=${fileId}`,
      kind: 'drive-file'
    };
  }

  // 3. Google Docs / Slides / Sheets
  const docsMatch = trimmed.match(/docs\.google\.com\/(document|spreadsheets|presentation)\/d\/([a-zA-Z0-9_-]+)/);
  if (docsMatch && docsMatch[1] && docsMatch[2]) {
    const docType = docsMatch[1];
    const docId = docsMatch[2];
    return {
      previewUrl: `https://docs.google.com/${docType}/d/${docId}/preview`,
      downloadUrl: `https://docs.google.com/${docType}/d/${docId}/export?format=pdf`,
      kind: 'google-doc'
    };
  }

  // 4. Direct PDF / Supabase Storage / External URL
  return {
    previewUrl: trimmed,
    downloadUrl: trimmed,
    kind: 'direct'
  };
}
