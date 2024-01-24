package com.squoshi.packdev.arcafirma.client;

import com.mojang.blaze3d.platform.GlStateManager;
import com.mojang.blaze3d.systems.RenderSystem;
import net.minecraft.Util;
import net.minecraft.client.gui.GuiGraphics;
import net.minecraft.client.gui.components.AbstractWidget;
import net.minecraft.client.gui.components.events.GuiEventListener;
import net.minecraft.util.Mth;

public class AFDeathScreen extends DeathScreenWrapper {
    private final DeathScreenWrapper deathScreen;

    private long fadeInStart;
    private long fadeOutStart;
    private long fadeInMenuStart;
    private boolean showMenu;

    public AFDeathScreen(DeathScreenWrapper deathScreen) {
        super(deathScreen);
        this.deathScreen = deathScreen;
        this.showingMenu = () -> showMenu;
    }

    public long easeOut(long x) {
        return (long) Math.sin((x * Math.PI) / 2);
    }

    @Override
    public void render(GuiGraphics graphics, int pMouseX, int pMouseY, float partialTick) {
        long now = Util.getMillis();

        if (fadeInStart == 0) {
            fadeInStart = now;
        }
        if (fadeOutStart == 0 && fadeInStart + 4000 < now) {
            fadeOutStart = now;
        }
        if (fadeInMenuStart == 0 && fadeInStart + 1000 < now) {
            fadeInMenuStart = now;
            showMenu = true;
        }

//        float zoomIn = Mth.clamp((now - fadeInStart) / 1200.0F, 0.0F, 1.0F);
        //above with easing
        float zoomIn = Mth.clamp((float) easeOut(now - fadeInStart) / 1200.0F, 0.0F, 1.0F);

        float fadeIn = 0;

        if (fadeOutStart == 0) {
            float fIn = (now - fadeInStart) / 1000.0F;
            fadeIn = Mth.clamp(fIn, 0.0F, 1.0F);
        }

        if (fadeOutStart > 0 && fadeInMenuStart == 0) {
            float fOut = (now - fadeOutStart) / 1000.0F;
            fadeIn = Mth.clamp(1.0F - fOut, 0.0F, 1.0F);
        }

        if (showMenu) {
            float fOut = (now - fadeInMenuStart) / 1000.0F;
            fadeIn = Mth.clamp(fOut, 0.0F, 1.0F);
        }


        RenderSystem.enableBlend();
        RenderSystem.blendFunc(GlStateManager.SourceFactor.SRC_ALPHA, GlStateManager.DestFactor.ONE_MINUS_SRC_ALPHA);
        RenderSystem.setShaderColor(1.0F, 1.0F, 1.0F, fadeIn);

        for (GuiEventListener guiEventListener : deathScreen.children()) {
            if (guiEventListener instanceof AbstractWidget) {
                ((AbstractWidget) guiEventListener).setAlpha(zoomIn);
            }
        }
        deathScreen.setAlpha(fadeIn);

        if (showMenu) {
            int l = Mth.ceil(fadeIn * 255.0F) << 24;
            if ((l & 0xfc000000) != 0) {
                deathScreen.render(graphics, pMouseX, pMouseY, partialTick);
                if (fadeIn - now > 15000) {
                    respawn();
                }
            }
        }
    }

    public void respawn() {
        this.minecraft.setScreen(null);
        this.minecraft.player.respawn();
    }
}
