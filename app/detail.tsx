import { Button, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Stack, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Dispatch, SetStateAction, useCallback } from "react";
import {User,  UserField } from "./data/user";
import dayjs from "dayjs";

interface Props {
  field:UserField | undefined
  user: User
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function DetailDialog({field, user, setOpen, open }: Props){
    const handleClose = useCallback(() => {
        setOpen(false)
      }, [setOpen])
    return (
        <Dialog open={open} maxWidth='md'>
      <DialogTitle>
        <CardHeader
          sx={{ p: 0 }}
          title={<Typography variant='h3'>{'Thông tin người dùng'}</Typography>}
          action={
            <IconButton aria-label='close' onClick={handleClose}>
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
        />
      </DialogTitle>
      <Divider variant='middle' />
      <DialogContent>
        <Stack
          direction='row'
          flexWrap='wrap'
          columnGap={10}
          rowGap={2}
          alignItems='flex-start'
          useFlexGap
          justifyContent='center'
        >
          <TextField
            label= {field? field.ID:"" }
            variant='outlined'
            name='id'
            defaultValue={user.ID}
            sx={{ width: '45%' }}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            label= {field? field.EMAIL:"" }
            variant='outlined'
            name='email'
            defaultValue={user.EMAIL}
            sx={{ width: '45%' }}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            label= {field? field.LAST_LOGIN:"" }
            variant='outlined'
            name='last_login'
            defaultValue={dayjs(user.LAST_LOGIN).format("HH:mm DD/MM/YYYY")}
            sx={{ width: '45%' }}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            label= {field? field.DATE_REGISTER:"" }
            variant='outlined'
            name='name'
            defaultValue={dayjs(user.DATE_REGISTER).format("DD/MM/YYYY")}
            sx={{ width: '45%' }}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            label= {field? field.PERSONAL_GENDER:"" }
            variant='outlined'
            name='personal_gender'
            defaultValue={user.PERSONAL_GENDER}
            sx={{ width: '45%' }}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            label= {field? field.PERSONAL_BIRTHDAY:"" }
            variant='outlined'
            name='personal_birthday'
            defaultValue={user.PERSONAL_BIRTHDAY}
            sx={{ width: '45%' }}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            label= {field? field.USER_TYPE:"" }
            variant='outlined'
            name='user_type'
            defaultValue={user.USER_TYPE}
            sx={{ width: '45%' }}
            InputProps={{
              readOnly: true
            }}
          />
        
        </Stack>
        <DialogActions sx={{ pt: 5 }}>
          <Button variant='outlined' onClick={handleClose} color='error'>
            Đóng
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
    )
    
}