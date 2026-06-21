// Services/FileTransfer/FileTransferService.ts
export type UploadedFileMeta = {
  id: string;          // fileId
  name: string;
  size?: number;
  mimeType?: string;
};

export type UploadTypingDataResponse = {
  typingDataId: string;
  files: UploadedFileMeta[]; // pelo menos 1
};

export type UploadIsolateDataResponse = {
  isolateDataId: string;
  files: UploadedFileMeta[];
};

async function uploadTypingData(
  projectId: string,
  file: File,
  typingDataType: string // "MLST" | ...
): Promise<UploadTypingDataResponse> {
  const form = new FormData();
  form.append("file", file);
  form.append("typingDataType", typingDataType);

  const res = await fetch(`/api/projects/${projectId}/typing-data/upload`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) {
    const msg = await safeErr(res);
    throw new Error(msg || "Falha no upload de Typing Data.");
  }
  return res.json();
}

async function uploadIsolateData(
  projectId: string,
  file: File
): Promise<UploadIsolateDataResponse> {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`/api/projects/${projectId}/isolate-data/upload`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) {
    const msg = await safeErr(res);
    throw new Error(msg || "Falha no upload de Isolate Data.");
  }
  return res.json();
}

// util para extrair mensagem de erro do backend
async function safeErr(res: Response): Promise<string | undefined> {
  try {
    const j = await res.json();
    return j?.message || j?.error || undefined;
  } catch {
    return undefined;
  }
}

export default {
  uploadTypingData,
  uploadIsolateData,
};
