const VIDEO_EXTENSIONS = /\.(mp4|webm|mov|m4v)(\?.*)?$/i;

export function normalizeMediaUrl(value?: string) {
  const trimmed = String(value || "").trim();

  if (!trimmed) {
    return "";
  }

  try {
    return encodeURI(decodeURI(trimmed));
  } catch {
    return encodeURI(trimmed);
  }
}

export function normalizeMediaUrls(values?: string[]) {
  return (values || []).map(normalizeMediaUrl).filter(Boolean);
}

export function getYouTubeVideoId(url: string) {
  try {
    const parsedUrl = new URL(normalizeMediaUrl(url));
    const hostname = parsedUrl.hostname.replace("www.", "");

    if (hostname === "youtu.be") {
      return parsedUrl.pathname.split("/").filter(Boolean)[0] || null;
    }

    if (hostname.endsWith("youtube.com")) {
      const watchId = parsedUrl.searchParams.get("v");
      const pathParts = parsedUrl.pathname.split("/").filter(Boolean);
      return watchId || (pathParts[0] === "shorts" || pathParts[0] === "embed" ? pathParts[1] : null);
    }

    return null;
  } catch {
    return null;
  }
}

export function getVideoEmbedUrl(url: string) {
  const normalizedUrl = normalizeMediaUrl(url);
  const youTubeId = getYouTubeVideoId(normalizedUrl);

  if (youTubeId) {
    return `https://www.youtube.com/embed/${youTubeId}`;
  }

  try {
    const parsedUrl = new URL(normalizedUrl);
    const hostname = parsedUrl.hostname.replace("www.", "");

    if (hostname.endsWith("vimeo.com")) {
      const videoId = parsedUrl.pathname.split("/").filter(Boolean)[0];
      return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
    }

    return null;
  } catch {
    return null;
  }
}

export function isDirectVideoUrl(url: string) {
  return VIDEO_EXTENSIONS.test(normalizeMediaUrl(url));
}

export function getCloudinaryVideoThumbnailUrl(url: string) {
  const normalizedUrl = normalizeMediaUrl(url);

  try {
    const parsedUrl = new URL(normalizedUrl);

    if (parsedUrl.hostname !== "res.cloudinary.com" || !parsedUrl.pathname.includes("/video/upload/")) {
      return null;
    }

    const posterPath = parsedUrl.pathname
      .replace("/video/upload/", "/video/upload/so_0,q_auto,f_jpg/")
      .replace(/\.(mp4|webm|mov|m4v)$/i, ".jpg");

    return `${parsedUrl.origin}${posterPath}`;
  } catch {
    return null;
  }
}

export function getVideoThumbnailUrl(url: string) {
  const normalizedUrl = normalizeMediaUrl(url);
  const youTubeId = getYouTubeVideoId(normalizedUrl);

  if (youTubeId) {
    return `https://img.youtube.com/vi/${youTubeId}/hqdefault.jpg`;
  }

  return getCloudinaryVideoThumbnailUrl(normalizedUrl);
}

export function readableLink(url: string) {
  try {
    const parsedUrl = new URL(normalizeMediaUrl(url));
    return parsedUrl.hostname.replace("www.", "");
  } catch {
    return url;
  }
}
