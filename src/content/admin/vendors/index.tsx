import { Helmet } from 'react-helmet-async';
import { Box, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { VendorStand as Vendor } from 'src/models/vendorStand';
import VendorsTable from './VendorsTable';
import EditVendorDialog from './EditVendor';
import { connect } from 'react-redux';
import BulkActions from './BulkActions';
import {
  patchVendorStand,
  postVendorStand,
  deleteVendorStand,
  getVendorStands,
  getVenue,
  patchVendorStands,
  deleteVendorStands
} from 'src/Api/apiClient';
import { Venue } from 'src/models/venue';
import { useNavigate } from 'react-router';
import ConfirmDialog from 'src/components/Dialog/ConfirmDialog';
import { useParams } from 'react-router';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';
import { ACTIONS } from 'src/components/BulkAction';

const TableWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(0)};
        background: white;
        border: 1px solid ${theme.general.borderColor};
`
);

const ContainerWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    height: calc(100% - 56px);
  `
);

const FooterWrapper = styled(Box)(
  ({ theme }) => `
        position: relative;
        bottom: 0;
        height: 56px;
        background: white;
        box-shadow: 0px -1px 16px rgba(159, 162, 191, 0.18), 0px -2px 2px rgba(159, 162, 191, 0.32);
`
);

interface VendorsPageProps {
  venues: Venue[];
  token: string;
}

function VendorsPage(props: VendorsPageProps) {
  const { venueId } = useParams();

  const { token, venues } = props;
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteBulkOpen, setDeleteBulkOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [venue, setVenue] = useState(null);

  const [selectedVendors, setSelectedVendors] = useState<Vendor[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadVendors();
    if (venueId) {
      getVenue(venueId)
        .then((res) => {
          if (res) {
            setVenue(res);
          } else {
            setVenue(null);
          }
        })
        .catch((ex) => {
          setVenue(null);
        });
    } else {
      setVenue(null);
    }
  }, [venueId]);

  const loadVendors = () => {
    setVendors([]);
    getVendorStands(token).then((res) => {
      if (res) {
        if (venueId) {
          setVendors(res.filter((x) => x.venueId === venueId));
        } else {
          setVendors(res);
        }
      }
    });
  };

  const onAction = (action, data) => {
    if (action === 'Edit') {
      setEditing(data);
      setEditOpen(true);
    } else if (action === 'Close') {
      setEditOpen(false);
      setEditing(null);
    } else if (action === 'Save') {
      setEditOpen(false);
      handleSave(data);
    } else if (action === 'Delete') {
      setEditOpen(false);
      setEditing(data);
      setDeleteOpen(true);
    } else if (action === 'Add New') {
      if (venueId) {
        setEditing({
          available: true,
          deliveryAvailable: true,
          pickupAvailable: true,
          venueId: venueId
        });
      } else {
        setEditing({
          available: true,
          deliveryAvailable: true,
          pickupAvailable: true
        });
      }
      setEditOpen(true);
    } else if (action === 'Cancel Remove') {
      setDeleteOpen(false);
      setEditing(null);
    } else if (action === 'Remove') {
      setDeleteOpen(false);
      handleDelete(editing);
      setEditing(null);
    } else if (action === 'Manage Staff') {
      navigate('/staff/' + data.id);
    } else if (action === 'Manage Menu') {
      navigate('/menuitems/' + data.id);
    } else if (action === 'Bulk Action') {
      handleBulkAction(data);
    } else if (action === 'Bulk Remove') {
      setDeleteBulkOpen(false);
      handleBulkRemove();
    } else if (action === 'Cancel Bulk Remove') {
      setDeleteBulkOpen(false);
    }
  };

  const handleBulkAction = (action) => {
    const ids = selectedVendors.map((vendor) => vendor.id);
    switch (action) {
      case ACTIONS.SET_AVAILABLE.action:
        patchVendorStands(token, ids, {
          available: true
        }).then((updatedVendors) => {
          let newVendors = [...vendors].map((vendor) => {
            const findVendor = updatedVendors.find(
              (uVendor) => uVendor.id === vendor.id
            );
            return findVendor ? findVendor : vendor;
          });
          setVendors(newVendors);
          setSelectedVendors([]);
        });
        break;
      case ACTIONS.SET_UNAVAILABLE.action:
        patchVendorStands(token, ids, {
          available: false
        }).then((updatedVendors) => {
          let newVendors = [...vendors].map((vendor) => {
            const findVendor = updatedVendors.find(
              (uVendor) => uVendor.id === vendor.id
            );
            return findVendor ? findVendor : vendor;
          });
          setVendors(newVendors);
          setSelectedVendors([]);
        });
        break;
      case ACTIONS.ENABLE_DELIVERY.action:
        patchVendorStands(token, ids, {
          deliveryAvailable: true
        }).then((updatedVendors) => {
          let newVendors = [...vendors].map((vendor) => {
            const findVendor = updatedVendors.find(
              (uVendor) => uVendor.id === vendor.id
            );
            return findVendor ? findVendor : vendor;
          });
          setVendors(newVendors);
          setSelectedVendors([]);
        });
        break;
      case ACTIONS.DISABLE_DELIVERY.action:
        patchVendorStands(token, ids, {
          deliveryAvailable: false
        }).then((updatedVendors) => {
          let newVendors = [...vendors].map((vendor) => {
            const findVendor = updatedVendors.find(
              (uVendor) => uVendor.id === vendor.id
            );
            return findVendor ? findVendor : vendor;
          });
          setVendors(newVendors);
          setSelectedVendors([]);
        });
        break;
      case ACTIONS.ENABLE_PICKUP.action:
        patchVendorStands(token, ids, {
          pickupAvailable: true
        }).then((updatedVendors) => {
          let newVendors = [...vendors].map((vendor) => {
            const findVendor = updatedVendors.find(
              (uVendor) => uVendor.id === vendor.id
            );
            return findVendor ? findVendor : vendor;
          });
          setVendors(newVendors);
          setSelectedVendors([]);
        });
        break;
      case ACTIONS.DISABLE_PICKUP.action:
        patchVendorStands(token, ids, {
          pickupAvailable: false
        }).then((updatedVendors) => {
          let newVendors = [...vendors].map((vendor) => {
            const findVendor = updatedVendors.find(
              (uVendor) => uVendor.id === vendor.id
            );
            return findVendor ? findVendor : vendor;
          });
          setVendors(newVendors);
          setSelectedVendors([]);
        });
        break;
      case ACTIONS.DELETE_VENDOR_STANDS.action:
        setDeleteBulkOpen(true);
        break;
      default:
        break;
    }
  };

  const handleBulkRemove = () => {
    const ids = selectedVendors.map((vendor) => vendor.id);
    deleteVendorStands(token, ids).then((res) => {
      if (!res) return;
      let newVendors = [...vendors].filter((vendor) => {
        const findVendor = selectedVendors.find(
          (sVendor) => sVendor.id === vendor.id
        );
        return findVendor ? false : true;
      });
      setVendors(newVendors);
      setSelectedVendors([]);
    });
  };

  const handleSave = (vendor) => {
    let patch: Vendor = { ...vendor };
    delete patch.id;
    delete patch.updatedAt;
    delete patch.createdAt;
    delete patch.deletedAt;
    delete patch.menuItems;
    delete patch.menuItemsCount;
    delete patch.staffsCount;

    Object.keys(patch).forEach((k) => patch[k] == null && delete patch[k]);

    if (vendor.id) {
      patchVendorStand(token, vendor, patch)
        .then((res) => {
          let newVendors = [...vendors];
          let index = newVendors.findIndex((x) => x.id === vendor.id);
          if (index >= 0) {
            newVendors[index] = res;
            setVendors(newVendors);
          }
        })
        .catch((ex) => {
          console.log(ex.message);
        });
    } else {
      postVendorStand(token, patch)
        .then((res) => {
          if (res) {
            setVendors((prev) => [...prev, res]);
          }
        })
        .catch((ex) => {
          console.log(ex.message);
        });
    }
  };

  const handleDelete = (vendor) => {
    deleteVendorStand(token, vendor.id).then((success) => {
      if (success) {
        let filtered = vendors.filter((x) => x.id !== vendor.id);
        setVendors(filtered);
      }
    });
  };

  const handleSelectionChanged = (selectedIDs) => {
    const selected = vendors.filter((x) => selectedIDs.includes(x.id));
    setSelectedVendors(selected);
  };

  const handleVendorPatch = (vendor, key, value) => {
    let patch = {};
    patch[key] = value;

    patchVendorStand(token, vendor, patch).then((res) => {
      let newVendors = [...vendors];
      let index = newVendors.findIndex((x) => x.id === vendor.id);
      if (index >= 0) {
        newVendors[index] = res;
        setVendors(newVendors);
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Vendors</title>
      </Helmet>
      {editOpen && editing && (
        <EditVendorDialog
          venueId={venueId}
          venues={venues}
          vendor={editing}
          open={editOpen}
          onAction={onAction}
        />
      )}
      {deleteOpen && editing && (
        <ConfirmDialog
          success="Remove"
          successLabel="DELETE"
          cancelLabel="RETURN"
          cancel="Cancel Remove"
          header="Are you sure you want to delete this vendor?"
          text="It cannot be recovered"
          open={deleteOpen}
          onAction={onAction}
        />
      )}
      {deleteBulkOpen && (
        <ConfirmDialog
          success="Bulk Remove"
          successLabel="DELETE"
          cancelLabel="RETURN"
          cancel="Cancel Bulk Remove"
          header="Are you sure you want to delete these vendors?"
          text="Deleted Vendors cannot be recovered"
          open={deleteBulkOpen}
          onAction={onAction}
        />
      )}
      {venue && (
        <PageTitleWrapper>
          <PageHeader venue={venue} />
        </PageTitleWrapper>
      )}
      <Box style={{ height: venue ? 'calc(100% - 56px)' : '100%' }}>
        <ContainerWrapper>
          <TableWrapper>
            <VendorsTable
              venue={venue}
              vendors={vendors}
              venues={venues}
              onAction={onAction}
              onSelectionChanged={handleSelectionChanged}
              onVendorPatch={handleVendorPatch}
            />
          </TableWrapper>
        </ContainerWrapper>
        <FooterWrapper>
          <BulkActions selected={selectedVendors} onAction={onAction} />
        </FooterWrapper>
      </Box>
    </>
  );
}

function reduxState(state) {
  return {
    token: state.auth && state.auth.token,
    venues: state.venues && state.venues.venues
  };
}
export default connect(reduxState)(VendorsPage);
