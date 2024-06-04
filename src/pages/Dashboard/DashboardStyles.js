import { StyleSheet } from 'react-native';

export const dashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#020a17',
    color: '#FFFFFF',
  },
  backgroundText: {
    position: 'absolute',
    bottom: 30,
    opacity: 0.2,
    fontSize:36,
    fontWeight:'900',
    lineHeight:54,
    width:'60%',
    textAlign:'center'
  },
  topSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 30,
    paddingBottom: 10,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 45,
    textAlign: 'left',
  },
  headingCount: {
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'left',
    fontWeight: '400',
    color: '#fff',
  },
  item: {
    backgroundColor: '#111828',
    color: '#fff',
    padding: 15,
    marginVertical: 2,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'left',
    fontWeight: '400',
    color: '#fff',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pinButton: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    paddingVertical: 24,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color:'#fff',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    paddingVertical: 24,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  refreshButton: {
    cursor: 'pointer',
    backgroundColor: '#020a17',
    padding: 10,
    borderRadius: 5,
  },
  refreshButtonHover: {
    backgroundColor: 'blue',
  },
  refreshButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  footer: {
    fontSize:16,
    fontWeight:'500',
    textAlign:'center'
  }
});
