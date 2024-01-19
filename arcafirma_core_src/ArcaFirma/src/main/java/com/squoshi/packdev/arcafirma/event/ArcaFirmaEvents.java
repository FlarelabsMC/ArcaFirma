package com.squoshi.packdev.arcafirma.event;

import com.squoshi.packdev.arcafirma.entity.ArcaFirmaEntities;
import com.squoshi.packdev.arcafirma.entity.custom.GolemEntity;
import net.minecraftforge.event.entity.EntityAttributeCreationEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;

@Mod.EventBusSubscriber(modid = "arcafirma", bus = Mod.EventBusSubscriber.Bus.MOD)
public class ArcaFirmaEvents {
    @SubscribeEvent
    public static void entityAttributeEvent(EntityAttributeCreationEvent event) {
        event.put(ArcaFirmaEntities.GOLEM.get(), GolemEntity.setAttributes());
    }
}