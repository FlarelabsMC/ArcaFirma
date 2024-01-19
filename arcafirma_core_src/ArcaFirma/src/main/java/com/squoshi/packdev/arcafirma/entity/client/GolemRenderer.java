package com.squoshi.packdev.arcafirma.entity.client;

import com.mojang.blaze3d.vertex.PoseStack;
import com.squoshi.packdev.arcafirma.entity.custom.GolemEntity;
import mod.azure.azurelib.renderer.GeoEntityRenderer;
import net.minecraft.client.renderer.MultiBufferSource;
import net.minecraft.client.renderer.entity.EntityRendererProvider;
import net.minecraft.resources.ResourceLocation;
import org.jetbrains.annotations.NotNull;

public class GolemRenderer extends GeoEntityRenderer<GolemEntity> {
    public GolemRenderer(EntityRendererProvider.Context context) {
        super(context, new GolemModel());
    }

    @Override
    public @NotNull ResourceLocation getTextureLocation(GolemEntity entity) {
        return new ResourceLocation("arcafirma:textures/entity/golem.png");
    }

    @Override
    public void render(GolemEntity animatable, float entityYaw, float partialTick, PoseStack poseStack, MultiBufferSource bufferSource, int packedLight) {
        poseStack.scale(2.0F, 2.0F, 2.0F);
        super.render(animatable, entityYaw, partialTick, poseStack, bufferSource, packedLight);
    }
}
