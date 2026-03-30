import type { ComponentType } from "react";

import type { SvgIconProps } from "@mui/material/SvgIcon";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import BusinessIcon from "@mui/icons-material/Business";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import PolicyOutlinedIcon from "@mui/icons-material/PolicyOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";

import type { OrganisatieIconKey } from "@/features/werkgroepen/types/werkgroepen.types";

const ICON_MAP: Record<OrganisatieIconKey, ComponentType<SvgIconProps>> = {
  bestuur: BusinessIcon,
  kerngroep: Diversity3OutlinedIcon,
  externeCommunicatie: PublicOutlinedIcon,
  ledencommunicatie: ForumOutlinedIcon,
  samenkomen: CelebrationOutlinedIcon,
  actie: FlagOutlinedIcon,
  massalijn: PolicyOutlinedIcon,
  campagne: HowToRegOutlinedIcon,
  programma: ArticleOutlinedIcon,
};

export interface OrganisatieIconProps extends SvgIconProps {
  iconKey: OrganisatieIconKey;
}

export const OrganisatieIcon = ({ iconKey, ...props }: OrganisatieIconProps) => {
  const Icon = ICON_MAP[iconKey];
  return <Icon aria-hidden {...props} />;
};
