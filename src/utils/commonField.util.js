import { DataTypes } from 'sequelize';

/**
 * Common fields to be used across all database models
 * Includes standard timestamps, soft delete, audit fields and organization reference
 */
export const commonFields = {
  // Standard tracking fields - automatically handled by Sequelize
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  // Soft delete field - will be handled by Sequelize paranoid option
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  // Audit fields - to track who created/modified the record
  createdBy: {
    type: DataTypes.INTEGER, // Assuming user IDs are integers
    allowNull: true, // Can be null for system-generated records
  },
  updatedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  // Organization reference - for multi-organization support

};
