package com.squoshi.packdev.arcafirma.entity;

import com.squoshi.packdev.arcafirma.entity.custom.GolemEntity;
import net.minecraft.world.entity.EntityType;
import net.minecraft.world.entity.MobCategory;
import net.minecraftforge.eventbus.api.IEventBus;
import net.minecraftforge.registries.DeferredRegister;
import net.minecraftforge.registries.ForgeRegistries;
import net.minecraftforge.registries.RegistryObject;

public class ArcaFirmaEntities {
    public static final DeferredRegister<EntityType<?>> ENTITY_TYPES =
            DeferredRegister.create(ForgeRegistries.ENTITY_TYPES, "arcafirma");

    public static final RegistryObject<EntityType<GolemEntity>> GOLEM =
            ENTITY_TYPES.register("golem",
                    () -> EntityType.Builder.of(GolemEntity::new, MobCategory.CREATURE)
                            .sized(1.4f, 2.7f)
                            .build("arcafirma:golem"));

    public static void register(IEventBus eventBus) { ENTITY_TYPES.register(eventBus); }
}
