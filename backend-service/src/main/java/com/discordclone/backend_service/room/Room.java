package com.discordclone.backend_service.room;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.discordclone.backend_service.roommember.RoomMember;
import com.discordclone.backend_service.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "rooms")
public class Room {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @Column(nullable = false)
    private String code;

    @Column(nullable = false)
    private String roomName;

    @CreatedDate
    private LocalDateTime createdAt;

    @CreatedBy
    private UUID createdUserId;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    @LastModifiedBy
    private UUID updatedUserId;

    @Column(nullable = false)
    private boolean isDeleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY)
    private List<RoomMember> members;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
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

    public boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    public User getOwner() {
        return this.owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public List<RoomMember> getMembers() {
        return members;
    }

    public void setMembers(List<RoomMember> members) {
        this.members = members;
    }
}
