package com.squoshi.packdev.arcafirma.client;

import net.minecraft.client.gui.GuiGraphics;
import net.minecraft.client.gui.components.AbstractWidget;
import net.minecraft.client.gui.components.Renderable;
import net.minecraft.client.gui.components.events.GuiEventListener;
import net.minecraft.client.gui.screens.DeathScreen;
import net.minecraft.network.chat.Component;
import net.minecraft.util.Mth;
import org.jetbrains.annotations.NotNull;

import java.util.Optional;
import java.util.function.BooleanSupplier;

public class DeathScreenWrapper extends DeathScreen {
    private final DeathScreen deathScreen;
    private float alpha;
    private final Component title = Component.translatable("arcafirma.death.title");
    protected BooleanSupplier showingMenu = () -> true;
    protected long timer;

    public DeathScreenWrapper(DeathScreen deathScreen) {
        super(null, deathScreen.hardcore);
        this.deathScreen = deathScreen;
    }

    @Override
    public void init() {
        deathScreen.init(minecraft, width, height);
        this.timer = 320;
        this.minecraft.options.hideGui = true;
    }

    public void setAlpha(float alpha) {
        this.alpha = alpha;
    }

    @SuppressWarnings("ConstantConditions")
    @Override
    public void render(GuiGraphics graphics, int mouseX, int mouseY, float partialTicks) {
        int alphaColor = Mth.ceil(this.alpha * 255.0F) << 24;
        graphics.fillGradient(0, 0, this.width, this.height, 0x60500000, 0xa0803030);
        graphics.pose().pushPose();
        graphics.pose().scale(2.0F, 2.0F, 2.0F);
        graphics.drawCenteredString(this.font, title, this.width / 2 / 2, 30, 0xffffff | alphaColor);
        String timerString = String.valueOf(timer / 20);
        graphics.drawCenteredString(this.font, timerString, this.width / 2 / 2, 80, 0xffffff | alphaColor);
        graphics.pose().popPose();
        if (deathScreen.causeOfDeath != null) {
            graphics.drawCenteredString(this.font, deathScreen.causeOfDeath, this.width / 2, 85, 0xffffff | alphaColor);
        }

        for (GuiEventListener guiEventListener : deathScreen.children()) {
            if (guiEventListener instanceof AbstractWidget) {
                ((AbstractWidget) guiEventListener).setAlpha(alpha);
            }
        }

        for (Renderable renderable : deathScreen.renderables) {
            renderable.render(graphics, mouseX, mouseY, partialTicks);
        }
    }

    @Override
    public boolean mouseClicked(double pMouseX, double pMouseY, int pButton) {
        if (showingMenu.getAsBoolean())
            return deathScreen.mouseClicked(pMouseX, pMouseY, pButton);
        return false;
    }

    @Override
    public void tick() {
        if (showingMenu.getAsBoolean()) {
            deathScreen.tick();
            if (this.timer > 0) {
                this.timer--;
            } else {
                this.minecraft.player.respawn();
                this.minecraft.options.hideGui = false;
            }
        }
    }

    @Override
    public void removed() {
        if (showingMenu.getAsBoolean())
            deathScreen.removed();
    }

    @Override
    public boolean mouseReleased(double pMouseX, double pMouseY, int pButton) {
        if (showingMenu.getAsBoolean())
            return deathScreen.mouseReleased(pMouseX, pMouseY, pButton);
        return super.mouseReleased(pMouseX, pMouseY, pButton);
    }

    @Override
    public boolean mouseDragged(double pMouseX, double pMouseY, int pButton, double pDragX, double pDragY) {
        if (showingMenu.getAsBoolean())
            return deathScreen.mouseDragged(pMouseX, pMouseY, pButton, pDragX, pDragY);
        return super.mouseDragged(pMouseX, pMouseY, pButton, pDragX, pDragY);
    }

    @Override
    public boolean mouseScrolled(double pMouseX, double pMouseY, double pDelta) {
        if (showingMenu.getAsBoolean())
            return deathScreen.mouseScrolled(pMouseX, pMouseY, pDelta);
        return super.mouseScrolled(pMouseX, pMouseY, pDelta);
    }

    @Override
    public boolean keyPressed(int pKeyCode, int pScanCode, int pModifiers) {
        if (showingMenu.getAsBoolean())
            return deathScreen.keyPressed(pKeyCode, pScanCode, pModifiers);
        return super.keyPressed(pKeyCode, pScanCode, pModifiers);
    }

    @Override
    public void afterMouseMove() {
        if (showingMenu.getAsBoolean())
            deathScreen.afterMouseMove();
    }

    @Override
    public void afterMouseAction() {
        if (showingMenu.getAsBoolean())
            deathScreen.afterMouseAction();
    }

    @Override
    public void afterKeyboardAction() {
        if (showingMenu.getAsBoolean())
            deathScreen.afterKeyboardAction();
    }

    @Override
    public boolean keyReleased(int pKeyCode, int pScanCode, int pModifiers) {
        if (showingMenu.getAsBoolean())
            return deathScreen.keyReleased(pKeyCode, pScanCode, pModifiers);
        return super.keyReleased(pKeyCode, pScanCode, pModifiers);
    }

    @Override
    public void mouseMoved(double pMouseX, double pMouseY) {
        if (showingMenu.getAsBoolean())
            deathScreen.mouseMoved(pMouseX, pMouseY);
    }

    @Override
    public @NotNull Optional<GuiEventListener> getChildAt(double pMouseX, double pMouseY) {
        if (showingMenu.getAsBoolean())
            return deathScreen.getChildAt(pMouseX, pMouseY);
        return super.getChildAt(pMouseX, pMouseY);
    }
}
