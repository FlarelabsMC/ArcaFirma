package com.squoshi.packdev.arcafirma.mixin;

import net.minecraft.world.phys.Vec3;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.gen.Invoker;

@Mixin(net.minecraft.client.Camera.class)
public interface CameraInvoker {
    @Invoker("setPosition")
    void invokeSetPosition(Vec3 pos);

    @Invoker("setRotation")
    void invokeSetRotation(float yRot, float xRot);

    @Invoker("move")
    void invokeMove(double forward, double up, double left);
}