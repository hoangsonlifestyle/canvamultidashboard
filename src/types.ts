/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CategoryFilter = 'All' | 'Regular' | 'Partner' | 'Offline event' | 'Other';

export interface DateRange {
  label: string;
  startDate: string | null;
  endDate: string | null;
}

export interface TerminationReason {
  reason: string;
  count: number;
  impact: 'High' | 'Med' | 'Low';
}

export interface ChannelDistribution {
  name: string;
  percentage: number;
  color: string;
}

export interface RegionDistribution {
  name: string;
  registrations: number;
  percentage: number;
  type: 'local' | 'international';
}

export interface IndustryDistribution {
  name: string;
  registrations: number;
  percentage: number;
}

export interface TrainerMetric {
  name: string;
  rating: number; // Out of 5
  color: string;
}

export interface FeedbackDataPoint {
  month: string;
  registrations: number;
  completions: number;
}
