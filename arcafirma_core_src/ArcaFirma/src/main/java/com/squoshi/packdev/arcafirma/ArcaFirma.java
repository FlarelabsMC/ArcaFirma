package com.squoshi.packdev.arcafirma;

import com.squoshi.packdev.arcafirma.entity.ArcaFirmaEntities;
import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.eventbus.api.IEventBus;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.javafmlmod.FMLJavaModLoadingContext;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Mod("arcafirma")
public class ArcaFirma {
    public static final Logger LOGGER = LogManager.getLogger();

    public ArcaFirma() {
        IEventBus modEventBus = FMLJavaModLoadingContext.get().getModEventBus();
        ArcaFirmaEntities.register(modEventBus);

        MinecraftForge.EVENT_BUS.register(this);
    }
}