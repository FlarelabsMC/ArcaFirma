package com.squoshi.packdev.arcafirma.util;

import com.squoshi.packdev.arcafirma.mixin.CameraInvoker;
import net.minecraft.client.Camera;
import net.minecraft.client.Minecraft;
import net.minecraft.world.phys.Vec3;

public class CameraUtil {
    private static final Camera camera = Minecraft.getInstance().gameRenderer.getMainCamera();

    public static void setPosition(double x, double y, double z) {
        ((CameraInvoker) camera).invokeSetPosition(new Vec3(x, y, z));
    }

    public static void setRotation(float yRot, float xRot) {
        ((CameraInvoker) camera).invokeSetRotation(yRot, xRot);
    }

    public static void move(double forward, double up, double left) {
        ((CameraInvoker) camera).invokeMove(forward, up, left);
    }
}
