import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import { CONTACT_PLACEHOLDER } from "@/features/werkgroepen/types/werkgroepen.types";
import type { OrganisatieLid } from "@/features/werkgroepen/types/werkgroepen.types";

const isMailtoReady = (email: string): boolean =>
  email !== CONTACT_PLACEHOLDER && email.includes("@");

const isTelReady = (phone: string): boolean => {
  if (phone === CONTACT_PLACEHOLDER) {
    return false;
  }
  const trimmed = phone.trim();
  return /^\+?\d[\d\s-]{6,}$/.test(trimmed);
};

export interface WerkgroepenMembersTableProps {
  members: OrganisatieLid[];
  emptyLabel: string;
}

export const WerkgroepenMembersTable = ({ members, emptyLabel }: WerkgroepenMembersTableProps) => {
  if (members.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        {emptyLabel}
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} variant="outlined" sx={{ mt: 2 }}>
      <Table size="small" aria-label="Leden en rollen">
        <TableHead>
          <TableRow>
            <TableCell>Naam</TableCell>
            <TableCell>Rol</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>Telefoon</TableCell>
            <TableCell>Opmerking</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((member, index) => (
            <TableRow key={`${member.name}-${member.roleLabel}-${index}`}>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.roleLabel}</TableCell>
              <TableCell>
                {isMailtoReady(member.email) ? (
                  <Link href={`mailto:${member.email}`}>{member.email}</Link>
                ) : (
                  member.email
                )}
              </TableCell>
              <TableCell>
                {isTelReady(member.phone) ? (
                  <Link href={`tel:${member.phone.replace(/\s/g, "")}`}>{member.phone}</Link>
                ) : (
                  member.phone
                )}
              </TableCell>
              <TableCell>{member.note ?? "—"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
