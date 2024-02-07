package com.squoshi.packdev.arcafirma.client;

import com.squoshi.packdev.arcafirma.entity.ArcaFirmaEntities;
import com.squoshi.packdev.arcafirma.entity.client.GolemRenderer;
import net.minecraft.client.Minecraft;
import net.minecraft.client.gui.screens.DeathScreen;
import net.minecraft.client.gui.screens.Screen;
import net.minecraft.client.player.LocalPlayer;
import net.minecraft.client.renderer.entity.EntityRenderers;
import net.minecraftforge.api.distmarker.Dist;
import net.minecraftforge.api.distmarker.OnlyIn;
import net.minecraftforge.client.event.ScreenEvent;
import net.minecraftforge.eventbus.api.EventPriority;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.event.lifecycle.FMLClientSetupEvent;

@Mod.EventBusSubscriber(modid = "arcafirma", bus = Mod.EventBusSubscriber.Bus.FORGE, value = Dist.CLIENT)
@OnlyIn(Dist.CLIENT)
public class ClientHandler {
    @SubscribeEvent(priority = EventPriority.LOWEST)
    public static void onOpenScreen(ScreenEvent.Opening event) {
        Screen screen = event.getScreen();
        if (screen instanceof DeathScreen deathScreen && !(screen instanceof AFDeathScreen)) {
            LocalPlayer player = Minecraft.getInstance().player;
            if (player != null && !(Minecraft.getInstance().screen instanceof DeathScreen)) {
                event.setNewScreen(new AFDeathScreen(new DeathScreenWrapper(deathScreen)));
            }
        }
    }

    @SubscribeEvent
    public static void onClientSetup(FMLClientSetupEvent event) {
        EntityRenderers.register(ArcaFirmaEntities.GOLEM.get(), GolemRenderer::new);
    }
}
