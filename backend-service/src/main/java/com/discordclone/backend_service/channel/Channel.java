package com.discordclone.backend_service.channel;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import com.discordclone.backend_service.channelmember.ChannelMember;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "channels")
public class Channel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID) 
    private UUID id;

    @Column(name = "room_id")
    @NotNull
    private UUID roomId;

    @Column(name = "channel_name")
    @NotBlank
    private String channelName;

    @Column(name = "is_dm")
    @NotNull
    private boolean isDm;

    @Column(name="created_at")
    @NotNull
    private LocalDateTime createdAt;

    @Column(name="created_user_id")
    @NotNull
    private UUID createdUserId;

    @Column(name="updated_at")
    @NotNull
    private LocalDateTime updatedAt;

    @Column(name="updated_user_id")
    @NotNull
    private UUID updatedUserId;

    @Column(name="is_deleted")
    @NotNull
    private boolean isDeleted;

    @OneToMany(mappedBy = "channel", cascade = CascadeType.ALL, fetch=FetchType.LAZY)
    private List<ChannelMember> channelMembers;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getRoomId() {
        return roomId;
    }

    public void setRoomId(UUID roomId) {
        this.roomId = roomId;
    }

    public String getChannelName() {
        return channelName;
    }

    public void setChannelName(String channelName) {
        this.channelName = channelName;
    }

    public Boolean getIsDm() {
        return isDm;
    }

    public void setIsDm(Boolean isDm) {
        this.isDm = isDm;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public UUID getCreatedUserId() {
        return createdUserId;
    }

    public void setCreatedUserId(UUID createdUserId) {
        this.createdUserId = createdUserId;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public UUID getUpdatedUserId() {
        return updatedUserId;
    }

    public void setUpdatedUserId(UUID updatedUserId) {
        this.updatedUserId = updatedUserId;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }
}
