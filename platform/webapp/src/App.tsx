import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from '@/app/AppShell';
import { RequireSession } from '@/app/RequireSession';
import { ApprovalsPage } from '@/pages/ApprovalsPage';
import { ConsentsPage } from '@/pages/ConsentsPage';
import { FulfilmentsPage } from '@/pages/FulfilmentsPage';
import { IncidentsPage } from '@/pages/IncidentsPage';
import { JourneyHome } from '@/pages/JourneyHome';
import { JourneysPage } from '@/pages/JourneysPage';
import { LoginPage } from '@/pages/LoginPage';
import { OffersPage } from '@/pages/OffersPage';
import { ReportingPage } from '@/pages/ReportingPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<RequireSession />}>
          <Route element={<AppShell />}>
            <Route index element={<JourneyHome />} />
            <Route path="journeys" element={<JourneysPage />} />
            <Route path="offers" element={<OffersPage />} />
            <Route path="approvals" element={<ApprovalsPage />} />
            <Route path="consents" element={<ConsentsPage />} />
            <Route path="fulfil" element={<FulfilmentsPage />} />
            <Route path="incidents" element={<IncidentsPage />} />
            <Route path="report" element={<ReportingPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
