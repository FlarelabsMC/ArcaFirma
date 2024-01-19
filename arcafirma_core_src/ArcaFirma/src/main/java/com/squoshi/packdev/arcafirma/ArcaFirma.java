package com.squoshi.packdev.arcafirma;

import com.squoshi.packdev.arcafirma.entity.ArcaFirmaEntities;
import com.squoshi.packdev.arcafirma.entity.client.GolemRenderer;
import net.minecraft.client.renderer.entity.EntityRenderers;
import net.minecraft.network.chat.Component;
import net.minecraftforge.api.distmarker.Dist;
import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.eventbus.api.IEventBus;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.event.lifecycle.FMLClientSetupEvent;
import net.minecraftforge.fml.javafmlmod.FMLJavaModLoadingContext;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Mod("arcafirma")
public class ArcaFirma {
    private static final Logger LOGGER = LogManager.getLogger();

    public ArcaFirma() {
        //register entities
        IEventBus modEventBus = FMLJavaModLoadingContext.get().getModEventBus();
        ArcaFirmaEntities.register(modEventBus);

        MinecraftForge.EVENT_BUS.register(this);
    }

    @Mod.EventBusSubscriber(modid = "arcafirma", bus = Mod.EventBusSubscriber.Bus.MOD, value = Dist.CLIENT)
    public static class ClientEvents {
        @SubscribeEvent
        public static void onClientSetup(FMLClientSetupEvent event) {
            EntityRenderers.register(ArcaFirmaEntities.GOLEM.get(), GolemRenderer::new);
        }
    }

    public enum Difficulty {
        CLASSIC(0, "classic"),
        EXPERT(1, "expert"),
        MASTER(2, "master");

        public final int id;
        public final String name;

        Difficulty(int i, String n) {
            this.id = i;
            this.name = n;
        }

        public static Difficulty fromId(int id) {
            for (Difficulty d : values()) {
                if (d.id == id) {
                    return d;
                }
            }
            return null;
        }

        public static int getId(Difficulty d) {
            return d.id;
        }

        public static String getName(Difficulty d) {
            return d.name;
        }

        public static Component getDisplayName(Difficulty d) {
            return Component.translatable("arcafirma.difficulty." + d.name);
        }
    }
}