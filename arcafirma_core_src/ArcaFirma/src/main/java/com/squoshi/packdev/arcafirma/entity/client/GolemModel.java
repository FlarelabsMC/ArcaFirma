package com.squoshi.packdev.arcafirma.entity.client;

import com.squoshi.packdev.arcafirma.entity.custom.GolemEntity;
import mod.azure.azurelib.model.GeoModel;
import net.minecraft.resources.ResourceLocation;

public class GolemModel extends GeoModel<GolemEntity> {
    private static final ResourceLocation model = new ResourceLocation("arcafirma", "geo/golem.geo.json");
    private static final ResourceLocation texture = new ResourceLocation("arcafirma", "textures/entity/golem.png");
    private static final ResourceLocation animation = new ResourceLocation("arcafirma", "animations/golem.animation.json");

    @Override
    public ResourceLocation getModelResource(GolemEntity animatable) {
        return model;
    }

    @Override
    public ResourceLocation getTextureResource(GolemEntity animatable) {
        return texture;
    }

    @Override
    public ResourceLocation getAnimationResource(GolemEntity animatable) {
        return animation;
    }
}
