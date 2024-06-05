import {StyleSheet} from 'react-native';

export const dashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#020a17',
    color: '#FFFFFF',
  },
  subHeadingSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timerText: {
    fontSize: 10,
    fontWeight: '300',
    lineHeight: 15,
    textAlign: 'left',
    color: '#F9FAFB',
  },
  topSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 30,
    fontWeight: '600',
    color: '#FFFFFF',
    paddingTop:2,
    lineHeight: 45,
    textAlign: 'left',
  },
  headingCount: {
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'left',
    fontWeight: '400',
    color: '#fff',
    paddingBottom:4
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
  },
  logoIcon: {
    height:32,
    width:100,
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
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
