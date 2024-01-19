package com.squoshi.packdev.arcafirma.mixin;

import com.squoshi.packdev.arcafirma.misc.GameTab;
import com.squoshi.packdev.arcafirma.misc.MoreTab;
import com.squoshi.packdev.arcafirma.misc.WorldTab;
import net.minecraft.client.gui.components.*;
import net.minecraft.client.gui.components.events.GuiEventListener;
import net.minecraft.client.gui.components.tabs.Tab;
import net.minecraft.client.gui.components.tabs.TabManager;
import net.minecraft.client.gui.components.tabs.TabNavigationBar;
import net.minecraft.client.gui.layouts.GridLayout;
import net.minecraft.client.gui.narration.NarratableEntry;
import net.minecraft.client.gui.screens.Screen;
import net.minecraft.client.gui.screens.worldselection.CreateWorldScreen;
import net.minecraft.client.gui.screens.worldselection.WorldCreationUiState;
import net.minecraft.network.chat.CommonComponents;
import net.minecraft.network.chat.Component;
import org.spongepowered.asm.mixin.Final;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.Shadow;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfo;

@Mixin(CreateWorldScreen.class)
public abstract class CreateWorldScreenMixin extends Screen {
    @Shadow
    private TabNavigationBar tabNavigationBar;
    @Shadow
    private GridLayout bottomButtons;
    @Final
    @Shadow
    private TabManager tabManager;
    @Final
    @Shadow
    WorldCreationUiState uiState;

    protected CreateWorldScreenMixin(Component title) {
        super(title);
    }

    @Inject(method = {"init()V"}, at = {@At("HEAD")}, cancellable = true)
    private void init(CallbackInfo ci) {
        this.tabNavigationBar = TabNavigationBar.builder(this.tabManager, this.width).addTabs(new Tab[]{new GameTab(uiState), new WorldTab(), new MoreTab()}).build();
        this.addRenderableWidget(this.tabNavigationBar);
        this.bottomButtons = (new GridLayout()).columnSpacing(10);
        GridLayout.RowHelper rowHelper = this.bottomButtons.createRowHelper(2);

        rowHelper.addChild(Button.builder(Component.translatable("selectWorld.create"), (button) -> {
            this.onCreate();
        }).build());
        rowHelper.addChild(Button.builder(CommonComponents.GUI_CANCEL, (button) -> {
            this.popScreen();
        }).build());

        this.bottomButtons.visitWidgets((abstractWidget) -> {
            abstractWidget.setTabOrderGroup(1);
            this.addRenderableWidget(abstractWidget);
        });

        this.tabNavigationBar.selectTab(0, false);

        this.uiState.onChanged();
        this.repositionElements();
        ci.cancel();
    }

    @Shadow
    protected <T extends GuiEventListener & Renderable & NarratableEntry> T addRenderableWidget(T widget) {
        return null;
    }

    @Shadow
    private void onCreate() {
    }

    @Shadow
    public void popScreen() {
    }
}