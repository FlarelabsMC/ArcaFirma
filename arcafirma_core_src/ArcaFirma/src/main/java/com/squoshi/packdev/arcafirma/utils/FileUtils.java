package com.squoshi.packdev.arcafirma.utils;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.Path;
import java.util.List;

import com.squoshi.packdev.arcafirma.ArcaFirma;
import net.minecraftforge.fml.loading.FMLPaths;
import org.jetbrains.annotations.NotNull;

public class FileUtils {
    private static boolean validPath(Path path) {
        path = Path.of(startPathFromModpackInstance(path.toString()));
        return path.normalize().toAbsolutePath().startsWith(FMLPaths.GAMEDIR.get().normalize().toAbsolutePath());
    }

    public static boolean fileExists(String path) {
        path = startPathFromModpackInstance(path);
        if (validPath(Path.of(path))) {
            return new File(path).exists();
        }
        return false;
    }

    public static String startPathFromModpackInstance(String path) {
        return FMLPaths.GAMEDIR.get().toString().replace("\\", "/") + "/" + path;
    }

    public static void downloadFileSafe(@NotNull String url, String path) throws IOException {
        List<String> WHITELISTED_FILE_TYPES = List.of(".jar", ".json");
        List<String> WHITELISTED_URLS = List.of(
                //CurseForge
                "https://www.curseforge.com",
                "https://edge.forgecdn.net",
                //Modrinth
                "https://modrinth.com",
                "https://cdn.modrinth.com",
                //CurseRinth
                "https://tizudev.vercel.app",
                "https://curserinth-tizu.vercel.app"
        );
        URL url1 = new URL(url);
        path = startPathFromModpackInstance(path);
        if (!validPath(Path.of(path))) {
            throw new IOException("Invalid path, please stay within the modpack instance directory!");
        }
        if (url.isEmpty()
                || path.isEmpty()
                || !OnlineUtils.checkOnlineStatus()
                || WHITELISTED_URLS.stream().noneMatch(url1.toString()::contains)
                || path.endsWith("/")
        ) {
            throw new IOException("Invalid URL or path, or no internet connection!");
        }
        if (!fileExists(path)) {
            try {
                HttpURLConnection connection = (HttpURLConnection) url1.openConnection();
                connection.addRequestProperty("User-Agent", "Mozilla/4.0");
                connection.setRequestMethod("HEAD");
                int responseCode = connection.getResponseCode();
                if (responseCode == 200) {
                    File file = new File(path);
                    if (WHITELISTED_FILE_TYPES.stream().anyMatch(path::endsWith)) {
                        InputStream in = url1.openStream();
                        org.apache.commons.io.FileUtils.copyInputStreamToFile(in, file);
                        ArcaFirma.LOGGER.info("Downloaded file: " + path);
                    } else {
                        ArcaFirma.LOGGER.info("Downloaded file's extension is not whitelisted: " + path);
                        if (file.exists()) file.delete();
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            ArcaFirma.LOGGER.info("File already exists: " + path + " - Skipping download, could be unsafe!");
        }
    }

    public static void asyncDownloadFileSafe(@NotNull String url, String path) {
        new Thread(() -> {
            try {
                downloadFileSafe(url, path);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }).start();
    }

    public static void downloadFile(@NotNull String url, String path, boolean async) {
        if (async) {
            asyncDownloadFileSafe(url, path);
        } else {
            try {
                downloadFileSafe(url, path);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}